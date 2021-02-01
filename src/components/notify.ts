import { notification } from "antd";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotifyArgs {
  type: NotificationType;
  message: string;
  description: string;
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}

function notify({
  type,
  message,
  description,
  placement = "bottomRight",
}: NotifyArgs) {
  notification[type]({ message, description, placement });
}

export default notify;
