import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import LoadingButton from "../../components/LoadingButton";
import { Button } from "../../components/ui/button";

import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { DialogClose } from "../../components/ui/dialog";

const formSchema = z.object({
  category: z.enum([
    "Payment issues",
    "Customer Feedback",
    "Offer proposition",
  ]),
  email: z.string().min(1, "email is required").email(),
  name: z.string().min(1, "name is required"),
  addressLine1: z.string().min(1, "addressLine1 is required"),
  city: z.string().min(1, "city is required"),
  country: z.string().min(1, "country is required"),
  message: z.string().min(10, "message should be at least 10 characters long"),
});

export type ContactFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (ContactFormData: ContactFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
};

const ContactForm = ({
  onSave,
  isLoading,
  buttonText = "Submit",
  title = "Contact Form",
}: Props) => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <FormDescription>Reach out to us for any inquiries</FormDescription>
        </div>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Payment issues">Payment issues</SelectItem>
                  <SelectItem value="Customer Feedback">
                    Customer Feedback
                  </SelectItem>
                  <SelectItem value="Offer proposition">
                    Offer proposition
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row  gap-4 ">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>address Line</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>city</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message Body</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="flex  resize-none bg-white pb-64"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <DialogClose>
            <Button type="submit" className="bg-green-500">
              {buttonText}
            </Button>
          </DialogClose>
        )}
      </form>
    </Form>
  );
};

export default ContactForm;
