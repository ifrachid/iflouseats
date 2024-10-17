import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type ContactRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
  message: string;
  category: string;
};

export const useContactApi = () => {
  const postContactForm = async (formData: ContactRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/my/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }
  };

  const {
    mutate: postContact,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(postContactForm);
  if (isSuccess) {
    toast.success("Request submitted !");
  }
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { postContact, isLoading };
};
