import { useState } from "react";
// import { ZodError } from "zod";
import { toast } from "sonner";
export interface ErrorStatusInterface {
  message: string;
}
export interface MakeApiCallFunctionProps<T> {
  fetcherFn: () => Promise<T>;
  onSuccessFn?: (response: T) => void;
  onFailureFn?: (error: unknown) => void;
  showLoader?: boolean;
  showFailureMsg?: boolean;
  finallyFn?: () => void;
}

export function useApi() {
  const [isLoading, setIsLoading] = useState(false);

  const fetcherMakeAxiosApiCall = async function <T>({
    fetcherFn,
    finallyFn,
  }: {
    fetcherFn: () => Promise<T>;
    finallyFn: () => void;
  }) {
    try {
      await fetcherFn();
    } catch (error) {
      const errorResponse = error as ErrorStatusInterface;
      toast.error(errorResponse.message);
    } finally {
      finallyFn();
    }
  };

  const makeApiCall = async function <
    T extends { status: number; body?: any },
  >({
    fetcherFn,
    onSuccessFn,
    onFailureFn,
    showLoader = true,
    showFailureMsg = true,
    finallyFn,
  }: MakeApiCallFunctionProps<T>) {
    if (showLoader) {
      // showPageLoader();
      setIsLoading(true);
    }
    try {
      const response = await fetcherFn();
      if (response.status >= 200 && response.status <= 299) {
        // hidePageLoader();
        setIsLoading(false);
        if (onSuccessFn) {
          onSuccessFn(response);
        } else {
          toast.success("Request successful");
        }
      } else if (response.status === 401) {
        // logout(true);
      } else {
        if (
          response &&
          response.body &&
          response.body.message &&
          showFailureMsg
        ) {
          toast.error(response.body.message);
        } else {
          if (!showFailureMsg) {
            return;
          }
          // const myError = new ZodError(response.body.issues);
          // const obj = myError.flatten().fieldErrors;

          // let outputString = "";
          // for (const key in obj) {
          //   if (obj.hasOwnProperty(key)) {
          //     outputString += `${key} is ${(obj?.[key] ?? []).join(
          //       ", "
          //     )}. <br/>`;
          //   }
          // }
          // outputString = outputString.trim();

          // toast.error(outputString);
        }
        // hidePageLoader();
        setIsLoading(false);
      }
    } catch (error) {
      // hidePageLoader();
      setIsLoading(false);
      const errorResponse = error as ErrorStatusInterface;
      if (onFailureFn) {
        onFailureFn(error);
      }
      if (!showFailureMsg) {
        return;
      }
      toast.error(errorResponse.message);
    } finally {
      finallyFn && finallyFn();
    }
  };

  return { makeApiCall, fetcherMakeAxiosApiCall, isApiLoading: isLoading };
}
