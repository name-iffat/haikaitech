import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

declare global {
  interface Window { dataLayer: unknown[]; }
}

export default function CalBooking() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
      cal("on", {
        action: "bookingCreated",
        callback: () => {
          if (typeof gtag !== "undefined") {
            gtag("event", "conversion", {
              send_to: "G-82BQD8BX9G",
              event_category: "booking",
              event_label: "cal_booking_created",
            });
          }
        },
      });
    })();
  }, [])
  return <Cal namespace="30min"
    calLink="haikaitech/30min"
    style={{width:"100%",height:"100%",overflow:"scroll"}}
    config={{"layout":"month_view"}}
    
    
  />;
};