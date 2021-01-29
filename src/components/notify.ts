import { notification } from "antd";

type NotificationType = "success" | "error" | "info" | "warning";

function notify(type: NotificationType, message: string, description: string) {
  notification[type]({ message, description, placement: "bottomRight" });
}

export default notify;
