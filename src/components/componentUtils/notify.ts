import { notification } from "antd";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotifyArgs {
  type: NotificationType;
  message: string;
  description: string;
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}

function notify(args: NotifyArgs) {
  if (!args.placement) args.placement = "bottomRight";
  const { type, message, description, placement } = args;
  notification[type]({ message, description, placement });
}

export default notify;
