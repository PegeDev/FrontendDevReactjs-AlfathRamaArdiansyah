import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IoArrowUndo,
  IoCall,
  IoChatbubble,
  IoGlobe,
  IoLocation,
} from "react-icons/io5";
import Rating from "../components/Rating";
import clsx from "clsx";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function DetailResto() {
  const { id } = useParams();
  const [detailResto, setDetailResto] = useState(null);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getResto = async () => {
      try {
        const { data } = await axios(
          `${process.env.REACT_APP_API_URL}/restaurants/list/`,
          {
            method: "GET",
            params: {
              location_id: id,
            },
            headers: {
              "Content-Type": "application/json",
              "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
              "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
            },
          }
        );

        setDetailResto(data.data);
      } catch (error) {
        toast.error("Something went wrong");

        // console.log(error);
      }
    };
    const getReviews = async () => {
      try {
        const { data } = await axios(
          `${process.env.REACT_APP_API_URL}/reviews/list/`,
          {
            method: "GET",
            params: {
              location_id: id,
              limit: "20",
            },
            headers: {
              "Content-Type": "application/json",
              "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
              "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
            },
          }
        );

        setReviews(data.data);
      } catch (error) {
        toast.error("Something went wrong");

        // console.log(error);
      }
    };
    getResto();
    getReviews();
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Restaurants List's App</title>
      </Helmet>
      <div className="w-full">
        <a
          href="/"
          className="fixed bottom-10 bg-blue-500 shadow-lg p-4 z-50 inline-flex items-center justify-center right-10 rounded-full"
        >
          <IoArrowUndo size={24} className="text-white" />
        </a>
        <div className="max-w-5xl mx-auto">
          {detailResto ? (
            <div className="flex flex-col">
              <div className="relative w-full h-80">
                <img
                  className="object-cover w-full h-full absolute"
                  src={detailResto[0]?.photo?.images?.large?.url}
                  alt={detailResto[0]?.photo?.caption}
                />
                <div className="absolute z-50  bg-black/40 md:bg-gradient-to-t md:from-black/80  md:to-transparent w-full h-full">
                  <div className="flex flex-col justify-center items-center gap-4 w-full max-w-xl mx-auto h-full px-4">
                    <h1 className="font-semibold text-4xl text-white">
                      {detailResto[0].name}
                    </h1>
                    <div className="flex items-center gap-4">
                      <Rating value={parseFloat(detailResto[0].rating)} />
                      <div className="flex items-center gap-2">
                        <p className="text-white">{detailResto[0].rating}</p>
                        <p className="text-white text-sm">
                          ({detailResto[0].num_reviews})
                        </p>
                      </div>
                    </div>
                    {detailResto[0].address ? (
                      <div className="flex flex-col md:flex-row items-center text-center">
                        <span>
                          <IoLocation className="text-white" size={24} />
                        </span>
                        <p className="text-white  hover:underline hover:underline-offset-2 cursor-pointer">
                          {detailResto[0].address || null}
                        </p>
                      </div>
                    ) : null}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <span className="text-white flex items-center gap-2  hover:underline hover:underline-offset-2 cursor-pointer">
                        <IoCall />
                        <p>{detailResto[0].phone}</p>
                      </span>
                      <a
                        href={detailResto[0].website}
                        className="text-white flex items-center gap-2 hover:underline hover:underline-offset-2"
                      >
                        <IoGlobe />
                        <p>{detailResto[0].website}</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-8">
                <div className="flex flex-col">
                  <h2 className="font-semibold mb-4 text-2xl md:text-4xl underline underline-offset-8">
                    Story
                  </h2>
                  <p>
                    {detailResto[0].description || "description not available"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-semibold mb-4 text-2xl md:text-4xl underline underline-offset-8">
                    Reviews
                  </h2>
                  <div className="flex w-full h-full relative overflow-x-auto pl-0 p-4 gap-4">
                    {reviews.length > 0
                      ? reviews.map((item) => {
                          return (
                            <div
                              key={item}
                              className="p-4 flex-none rounded-lg border shadow-lg w-64 md:w-96 "
                            >
                              <div className="flex w-full overflow-hidden">
                                <div className="flex flex-col gap-4 ">
                                  <div className="flex items-center justify-around gap-4 p-2 mb-4">
                                    <div className="relative w-12  h-12 ring-2 ring-blue-600 overflow-hidden rounded-full">
                                      <img
                                        className="object-cover w-full h-full absolute"
                                        src={item.user.avatar.large.url}
                                      />
                                    </div>
                                    <div className="flex flex-col">
                                      <p>
                                        {item.user.name || item.user.username}
                                      </p>
                                      <Rating value={item.rating} />
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <div className="flex items-center gap-2 mb-4">
                                      <span>
                                        <IoChatbubble size={20} />
                                      </span>
                                      <h3 className="font-semibold overflow-hidden text-ellipsis">
                                        {item.title}
                                      </h3>
                                    </div>
                                    <p className="text-sm">{item.text}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </HelmetProvider>
  );
}
