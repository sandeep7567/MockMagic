"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { URL } from "url";

const revalidate = 0;

export interface PostType {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [filter, setFilter] = useState<{
    limit: number | null;
    id: number | null;
  }>({
    limit: null,
    id: null,
  });
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [filter.limit, filter.id]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Parse the value as a number if it's a valid number, otherwise keep it as a string
    const parsedValue = /^\d+$/.test(value) ? parseInt(value, 10) : null;
    setFilter((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  const reset = () => {
    setFilter((prev) => (
      {
        ...prev,
        limit: null,
        id: null,
      }
    ))
  };

  const fetchData = async () => {
    try {
      const { limit, id } = filter;
      const queryParams = new URLSearchParams();
      if (limit) queryParams.append("_limit", limit.toString());
      if (id) queryParams.append("id", id.toString());

      const searchParams = queryParams.toString();
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?${searchParams}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="w-40 p-4 m-56 h-40 mx-auto border-t-2 border-blue-500 rounded-full animate-spin" />
    );
  };

  const id = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="w-full p-4 my-16">
      <div className="w-full p-2 flex justify-between items-center">
        <h1 className="w-1/2 mx-auto text-2xl text-center text-black font-bold">
          Fetch Data with jsonplaceholder
        </h1>

        <div className="w-1/2 mx-auto grid grid-cols-1 gap-4">
          <div className="flex w-full justify-center items-center gap-5">
            <div className="w-full flex justify-center items-center gap-4 mx-auto text-sm text-center hover:text-white/90 hover:bg-black/90 bg-black text-white p-2 rounded-md hover:scale-105 transition-all duration-200 hover:transition-all hover:duration-200">
              <label
                htmlFor="limit"
                className="block text-sm font-medium text-gray-100"
              >
                {" "}
                Limit{" "}
              </label>

              <select
                name="limit"
                id="limit"
                value={filter.limit || ''}
                onChange={handleSelectChange}
                className="mt-0.5 p-1 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
              >
                <option value="">Select Limit</option>
                {id.length > 0 && id.map((value) => <option value={value}>{value}</option>)}
              </select>
            </div>
            <div className="w-full flex justify-center items-center gap-4 mx-auto text-sm text-center hover:text-white/90 hover:bg-black/90 bg-black text-white p-2 rounded-md hover:scale-105 transition-all duration-200 hover:transition-all hover:duration-200">
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-100"
              >
                {" "}
                id{" "}
              </label>

              <select
                value={filter.id || ''}
                onChange={handleSelectChange}
                name="id"
                id="id"
                className="mt-0.5 p-1 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
              >
                <option value="">Select Id</option>
                {id && id.map((value) => <option value={value}>{value}</option>)}
              </select>
            </div>

            <button
              className="w-1/2 mx-auto text-sm text-center text-white hover:text-white/90 hover:bg-indigo-500/90 bg-indigo-500 p-3 rounded-md hover:scale-105 transition-all duration-200 hover:transition-all hover:duration-200"
              onClick={reset}
            >
              Reset
            </button>
            <button
              className="w-1/2 mx-auto text-sm text-center text-white hover:text-white/90 hover:bg-indigo-500/90 bg-indigo-500 p-3 rounded-md hover:scale-105 transition-all duration-200 hover:transition-all hover:duration-200"
              onClick={() => router.push("/posts/new")}
            >
              Add New
            </button>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-3 gap-4 my-10">
        {posts.length > 0 &&
          posts.map((item: PostType) => (
            <Link
              href={`/posts/${item.id}`}
              key={item.id}
              className="rounded-xl p-4 ring ring-indigo-50 hover:bg-blue-500/10 sm:p-6 lg:p-8 cursor-pointer transition-all duration-200 hover:transition-all hover:duration-200"
            >
              <div className="flex items-start sm:gap-8">
                <div
                  className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
                  aria-hidden="true"
                >
                  <div className="flex items-center gap-1">
                    <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
                    <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                    <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
                    <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                    <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
                  </div>
                </div>

                <div>
                  <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
                    {item.id}
                  </strong>

                  <h3 className="mt-4 text-lg font-medium sm:text-xl">
                    {" "}
                    {item.title}
                  </h3>

                  {/* <p className="mt-1 text-sm text-gray-700">{item.body}</p> */}

                  <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                    <div className="flex items-center gap-1 text-gray-500">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>

                      <p className="text-xs font-medium">
                        <span className="text-gray-500 text-xs">id:</span>{" "}
                        {item.userId ?? ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
