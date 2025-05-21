import { useState } from "react";
import { MessageCircle, Heart, Star } from "lucide-react";
import Image from "next/image";

export default function AppDownloadModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="flex items-center mb-6">
          <div className="h-16 w-16 rounded-xl bg-rose-100 flex items-center justify-center">
            <Image
              width={100}
              height={100}
              src="/images/wedding.png"
              alt="App Logo"
              className="h-12 w-12 rounded-xl"
            />
          </div>
          <div className="ml-4">
            <h3 className="font-bold text-lg">Jodi4Ever</h3>
            <div className="flex items-center">
              <Star size={14} className="text-yellow-400" fill="currentColor" />
              <Star size={14} className="text-yellow-400" fill="currentColor" />
              <Star size={14} className="text-yellow-400" fill="currentColor" />
              <Star size={14} className="text-yellow-400" fill="currentColor" />
              <Star size={14} className="text-gray-300" fill="currentColor" />
              <span className="text-gray-500 text-xs ml-1">4.8 (10+)</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-lg mb-2">
            This feature is only available in our app
          </h4>
          <p className="text-gray-600">
            Download our app to message matches, send interests, and access
            premium features for a better matrimony experience.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h5 className="font-medium text-sm mb-2">App Exclusive Features:</h5>
          <ul className="space-y-2">
            <li className="flex items-center text-sm">
              <div className="h-5 w-5 rounded-full bg-rose-100 flex items-center justify-center mr-2">
                <MessageCircle size={12} className="text-rose-500" />
              </div>
              Direct messaging with potential matches
            </li>
            <li className="flex items-center text-sm">
              <div className="h-5 w-5 rounded-full bg-rose-100 flex items-center justify-center mr-2">
                <Heart size={12} className="text-rose-500" />
              </div>
              Express interest and receive notifications
            </li>
            <li className="flex items-center text-sm">
              <div className="h-5 w-5 rounded-full bg-rose-100 flex items-center justify-center mr-2">
                <Star size={12} className="text-rose-500" />
              </div>
              Premium filters and match preferences
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.jodi4ever"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-black text-white w-full py-3 px-4 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="20"
              id="google-play-store"
              className="fill-white mr-4"
            >
              <path
                fillRule="evenodd"
                d="M0 19.928V20l8.5-5 3.096-1.815-2.464-2.48L0 19.928zM12.452 7.334 9.802 10l2.65 2.667L17 10l-4.548-2.666zm-.885-.518L8.5 5 0 0v.072l9.132 9.224 2.435-2.48zM8.469 9.967 0 18.517V1.423l8.47 8.544z"
              ></path>
            </svg>

            <span>Get it on Google Play</span>
          </a>

          {/* <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-black text-white w-full py-3 px-4 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 50 50"
              className="fill-white mr-4"
            >
              <path d="M 25 2 C 12.308594 2 2 12.308594 2 25 C 2 37.691406 12.308594 48 25 48 C 37.691406 48 48 37.691406 48 25 C 48 12.308594 37.691406 2 25 2 Z M 25 4 C 36.609375 4 46 13.390625 46 25 C 46 36.609375 36.609375 46 25 46 C 13.390625 46 4 36.609375 4 25 C 4 13.390625 13.390625 4 25 4 Z M 24.9375 10.78125 C 24.792969 10.800781 24.636719 10.859375 24.5 10.9375 L 23.59375 11.46875 C 23.054688 11.78125 22.875 12.492188 23.1875 13.03125 L 31.03125 26.53125 L 33.90625 24.84375 L 26.0625 11.34375 C 25.828125 10.941406 25.375 10.726563 24.9375 10.78125 Z M 22.53125 15.28125 C 22.09375 15.222656 21.640625 15.40625 21.40625 15.8125 L 20.40625 17.53125 L 23.375 19.25 L 24.375 17.5625 C 24.691406 17.023438 24.507813 16.316406 23.96875 16 L 22.96875 15.40625 C 22.832031 15.328125 22.675781 15.300781 22.53125 15.28125 Z M 20.15625 17.9375 L 13.25 29.8125 L 16.1875 31.53125 L 23.125 19.6875 Z M 10.3125 23.3125 L 10.3125 26.625 L 14.53125 26.625 L 16.46875 23.3125 Z M 21.4375 23.3125 L 19.59375 26.625 L 30.34375 26.625 L 28.5 23.3125 Z M 33.71875 23.3125 L 35.5 26.625 L 39.625 26.625 L 39.625 23.3125 Z M 34.21875 25.40625 L 31.34375 27.0625 L 33 29.9375 L 35.875 28.25 Z M 35.75 29.03125 C 35.652344 29.046875 35.535156 29.101563 35.4375 29.15625 C 34.96875 29.421875 34.285156 29.816406 33.875 30.0625 C 33.105469 30.523438 33.699219 31.863281 33.875 32.15625 C 34.871094 33.824219 35.882813 33.601563 36.65625 34.78125 C 37.082031 35.425781 36.960938 35.691406 37.09375 35.90625 C 37.144531 35.984375 37.339844 36.089844 37.40625 36 C 38.601563 34.347656 38.238281 31.484375 37.375 30.21875 C 37.023438 29.703125 36.425781 28.921875 35.75 29.03125 Z M 12.875 30.4375 L 11.4375 35.84375 C 11.410156 35.941406 11.445313 36.042969 11.53125 36.09375 C 11.617188 36.144531 11.742188 36.132813 11.8125 36.0625 L 15.8125 32.1875 Z"></path>
            </svg>
            <span>Download on App Store</span>
          </a> */}
        </div>
      </div>
    </div>
  );
}
