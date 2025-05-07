document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("download-ics").addEventListener("click", function (event) {
      event.preventDefault(); // ป้องกันการโหลดหน้าซ้ำ
  
      // ข้อมูลเหตุการณ์
      const eventData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Your App//EN",
        "BEGIN:VEVENT",
        "UID:" + new Date().getTime() + "@yourdomain.com",
        "DTSTAMP:" + formatDate(new Date()),
        "DTSTART:20250830T103000Z", // วันที่เริ่ม
        "DTEND:20250830T140000Z",   // วันที่สิ้นสุด
        "SUMMARY:Nook&&BEAM's Wedding Day.",
        "DESCRIPTION:Wedding Party.",
        "LOCATION:https://maps.app.goo.gl/iA4JnNnmGwBjNK9m9",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\n");
  
      // สร้างไฟล์ Blob
      const blob = new Blob([eventData], { type: "text/calendar" });
      const url = URL.createObjectURL(blob);
  
      // สร้างลิงก์ดาวน์โหลด
      const a = document.createElement("a");
      a.href = url;
      a.download = "event.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  
    function formatDate(date) {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    }
  });
  