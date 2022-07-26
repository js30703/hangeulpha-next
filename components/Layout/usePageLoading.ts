
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function usePageLoading() {
  const [loading, setLoading] = useState(false);
  const [urlNow, setUrlNow] = useState("/");

  const router = useRouter();
  // 로딩 완료의 시점을 url 이 바뀌었을때로 잡음
  useEffect(() => {
    const handleStart = (url: string) => {
      setUrlNow(url);
      url !== router.pathname && setLoading(true);
    };
    const handleComplete = (url: string) => {
      url === router.pathname && setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    setUrlNow(router.pathname);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  return { loading, urlNow };
}