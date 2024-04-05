"use client";

import { PostType } from "@/app/page";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<{
    userId: number;
    title: string;
    body: string;
  }>({
    userId: 0,
    title: "",
    body: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [postById, setPostById] = useState<PostType | null>(null);
  console.log(postById);

  console.log(postById);

  const fetchData = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const json = await res.json();
    setPostById(json);
  };

  useEffect(() => {
    if (id && id[0] === "new") {
      return;
    }
    if (id) {
      fetchData();
    }
  }, [id]);

  console.log(id[0]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    if (
      formData.userId === 0 ||
      formData.title === "" ||
      formData.body === ""
    ) {
      alert("please enter valid data");
      return;
    }
    try {
      setError(true);
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({
            title: "foo",
            body: "bar",
            userId: 1,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();

      setPostById(data);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
    console.log("submit", formData);
  };

  // creat a posts in fake db ( Create Post Form );
  if (id && id.length > 0 && id[0] === "new") {
    return (
      <>
        <form
          onSubmit={handleOnSubmit}
          className="mt-20 max-w-screen-lg w-9/12 mx-auto grid grid-cols-1 gap-6"
        >
          <div className="col-span-6">
            <label
              htmlFor="userId"
              className="block text-lg font-medium text-gray-700"
            >
              userId
            </label>

            <input
              onChange={handleChange}
              value={formData.userId}
              type="number"
              id="userId"
              name="userId"
              className="mt-1 w-full p-3 pl-4 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700"
            >
              Title
            </label>

            <input
              onChange={handleChange}
              value={formData.title}
              type="text"
              id="title"
              name="title"
              className="mt-1 w-full p-3 pl-4 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6">
            <label
              htmlFor="body"
              className="block text-lg font-medium text-gray-700"
            >
              {" "}
              Body{" "}
            </label>

            <textarea
              onChange={handleChange}
              value={formData.body}
              id="body"
              name="body"
              className="mt-1 w-full p-3 pl-4 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              type="submit"
              disabled={
                formData.body === "" ||
                formData.title === "" ||
                formData.userId === 0 ||
                loading
              }
              className="inline-block shrink-0 rounded-md border disabled:bg-blue-600/50 disabled:text-white/50 disabled:cursor-not-allowed border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Create a new posts
            </button>
          </div>
        </form>
        {postById === null && (
          <div className="w-1/2 flex flex-col justify-center items-center gap-2 mt-20 text-2xl mx-auto ">
            <strong> Create Data to show here</strong> <br /> Not Data Found
          </div>
        )}
        {postById && (
          <div className="w-1/2 mx-auto grid grid-cols-1 gap-4 my-20">
            <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 cursor-pointer">
              <div className="w-1/2 flex flex-col justify-center items-center gap-2 my-4 text-2xl mx-auto ">
                <strong> Generated Posts</strong>
              </div>
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
                  <div className="flex justify-between w-full gap-96 items-center">
                    <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
                      {postById?.id ?? ""}
                    </strong>

                    <div className="flex gap-2">
                      <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </strong>
                      <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </strong>
                    </div>
                  </div>

                  <h3 className="mt-4 text-lg font-medium sm:text-xl">
                    <span className="text-black font-bold text-lg">Title:</span>{" "}
                    {postById?.title ?? ""}
                  </h3>

                  <p className="mt-1 text-sm text-gray-700">
                    <span className="text-black font-bold text-lg">Body:</span>{" "}
                    {postById?.body ?? ""}
                  </p>

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
                        <span className="text-black font-bold text-lg">
                          UserID:
                        </span>{" "}
                        {postById?.userId ?? ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}
      </>
    );
  }

  if (!postById) {
    return (
      <div className="w-40 p-4 m-56 h-40 mx-auto border-t-2 border-blue-500 rounded-full animate-spin" />
    );
  }

  // show posts details with their specfic id ( View Page )
  return (
    <div className="w-full p-4 my-16">
      <div className="w-full p-2">
        <h1 className="w-1/2 mx-auto text-2xl text-center text-black font-bold">
          Fetch Post Data with POST ID: <span className="text-indigo-500">{id}</span> ( jsonplaceholder )
        </h1>
      </div>

      <div className="w-1/2 mx-auto grid grid-cols-1 gap-4 my-20">
        <article className="rounded-xl bg-black text-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 cursor-pointer hover:scale-105 transition-all duration-200 hover:transition-all hover:duration-200">
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
              <div className="flex justify-between items-center">
                <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
                  {postById?.id ?? ""}
                </strong>

                <div className="flex gap-2">
                  <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </strong>
                  <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </strong>
                </div>
              </div>

              <h3 className="mt-4 text-lg font-medium sm:text-xl">
                <span className="font-bold text-lg">Title:</span>{" "}
                {postById?.title ?? ""}
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                <span className="font-bold text-lg">Body:</span>{" "}
                {postById?.body ?? ""}
              </p>

              <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                <div className="flex items-center gap-1 text-slate-400">
                  <svg
                    className="h-5 w-5"
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
                    <span className="text-slate-400 font-bold text-xs">
                      UserID:
                    </span>{" "}
                    {postById?.userId ?? ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default page;
