import { Button } from "@components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card";
import { Movie } from "@lib/types";
import Image from "next/image";
import Link from "next/link";

interface MovieCardProps extends Movie {}

const MovieCard = async ({ id, name, description, imageUrl }: MovieCardProps) => (
  <Card>
    <CardHeader>
      <h3 className="text-md">{name}</h3>
    </CardHeader>
    <CardContent>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={300}
          priority
          className="w-full object-cover rounded-lg aspect-square"
        />
      ) : (
        <div className="w-full h-[300px] bg-slate-300 rounded-lg aspect-square flex items-center justify-center">
          <p>Картинка отсутствует</p>
        </div>
      )}
      <p className="mt-5 truncate">{description}</p>
    </CardContent>
    <CardFooter className="flex flex-row-reverse">
      <Link href={`/movies/${id}`} data-qa-id="more_button">
        <Button type="button">Подробнее</Button>
      </Link>
    </CardFooter>
  </Card>
);

export default MovieCard;
