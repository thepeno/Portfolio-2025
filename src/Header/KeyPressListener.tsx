"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const KeyPressListener = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "1":
          router.push("/case-studies");
          break;
        case "2":
          router.push("/projects");
          break;
        case "3":
          router.push("/about");
          break;
        case "4":
          router.push("/resume");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [router]);

  return null;
};
