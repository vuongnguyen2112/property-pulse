"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Pagination = ({ page, pageSize, totalItems }) => {
  const { push } = useRouter();
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {page > 1 ? (
        <Link
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
          href={`/properties?page=${page - 1}`}
        >
          Previous
        </Link>
      ) : null}
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          className="ml-2 px-2 py-1 border border-gray-300 rounded"
          href={`/properties?page=${page + 1}`}
        >
          Next
        </Link>
      ) : null}
      <select
        name="pageSize"
        id="pageSize"
        className="ml-3 border hover:bg-gray-100 rounded px-2 py-1"
        onChange={(e) =>
          push(`/properties?page=${page}&pageSize=${e.target.value}`)
        }
      >
        <option selected value="6">
          6
        </option>
        <option value="12">12</option>
      </select>
    </section>
  );
};
export default Pagination;
