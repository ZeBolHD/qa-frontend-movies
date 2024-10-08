"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Review } from "@lib/types";
import { useRouter } from "next/navigation";

import useSession from "@hooks/useSession";
import { MoviesService } from "@api/services";

import PersonalReviewActions from "./PersonalReviewActions";
import ReviewCard from "../ReviewCard";
import ReviewForm from "./ReviewForm";

interface PersonalReviewProps {
  review?: Review;
  movieId: number;
}

const PersonalReview = ({ review, movieId }: PersonalReviewProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { session } = useSession();

  const router = useRouter();

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleDelete = async () => {
    const { status } = await MoviesService.deleteReview({
      params: { movieId },
    });

    if (status !== 200) {
      toast.error("Произошла ошибка");
      return;
    }

    toast.success("Отзыв успешно удален");
    router.refresh();
  };

  if (!session) {
    return (
      <p className="mt-5 text-xl">
        <Link className="underline" href="/login">
          Войдите
        </Link>
        , чтобы оставить отзыв
      </p>
    );
  }

  return (
    <div className="w-full mt-5">
      {isFormOpen || !review ? (
        <ReviewForm review={review} movieId={movieId} closeForm={closeForm} />
      ) : (
        <ReviewCard
          {...review}
          hidden={false}
          actions={<PersonalReviewActions handleDelete={handleDelete} handleEdit={openForm} />}
        />
      )}
    </div>
  );
};

export default PersonalReview;
