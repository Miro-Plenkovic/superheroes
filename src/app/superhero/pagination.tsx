"use client";
import { redirect, usePathname, useSearchParams } from "next/navigation";

export default function Pagination() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const currentSearch = searchParams.get("search") || "";

  const createPageURL = (direction: "back" | "forward") => {
    const params = new URLSearchParams(searchParams);
    params.set(
      "page",
      (direction === "back"
        ? currentPage == 1
          ? 1
          : currentPage - 1
        : currentPage + 1
      ).toString()
    );
    params.set("search", currentSearch);
    return `${pathname}?${params.toString()}`;
  };
  const createSearchURL = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", currentPage.toString());
    params.set("search", searchTerm);
    redirect(`${pathname}?${params.toString()}`);
  };
  return (
    <>
      <div>
        <a href={createPageURL("back")}>back</a>
      </div>
      <div>
        <input
          defaultValue={currentSearch}
          onChange={(e) => createSearchURL(e.target.value)}
        ></input>
      </div>
      <div>
        <a href={createPageURL("forward")}>forward</a>
      </div>
    </>
  );
}
