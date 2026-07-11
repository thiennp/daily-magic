import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";

export default function DefaultInputsPaymentField() {
  return (
    <div>
      <Label htmlFor="tm">Input with Payment</Label>
      <div className="relative">
        <Input type="text" placeholder="Card number" className="pl-[62px]" />
        <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
            <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
            <path
              d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
              fill="#FC6020"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
