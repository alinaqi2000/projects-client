import { createStandaloneToast } from "@chakra-ui/react"
const toast = createStandaloneToast()
export const toastSuccess = (message: string) => {
    toast({ title: "Success!", description: message, status: "success", position: 'top-right' })
}
export const toastError = (message: string) => {
    toast({ title: "Error!", description: message, status: "error", position: 'top-right' })
}