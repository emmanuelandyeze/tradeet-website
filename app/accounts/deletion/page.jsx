'use client'
import { useState } from "react";
import axios from "axios";

export default function DeleteAccount() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.delete("/api/delete-account", {
        data: { email },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-red-600">
          Delete Account
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Enter your email to confirm account deletion. This action is
          irreversible.
        </p>

        <form onSubmit={handleDelete} className="mt-4">
          <label className="block text-gray-700 text-sm font-semibold">
            Email Address
          </label>
          <input
            type="email"
            className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full mt-4 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Delete Account"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
