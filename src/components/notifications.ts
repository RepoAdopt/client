import { ElNotification } from "element-plus";

const position = 'bottom-right'

export function showError(title: string, message: string) {
  ElNotification({
    type: "error",
    title,
    message,
    position,
  });
}

export function showSuccess(title: string, message: string) {
  ElNotification({
    type: "success",
    title,
    message,
    position,
  });
}
