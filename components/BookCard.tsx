import Link from "next/link";
import Image from "next/image";
import {BookCardProps} from "@/types";



export const BookCard = (props: BookCardProps) => {
    const {title, author, coverURL, slug} = props;
    return (
        <Link href={`/book/${slug}`}>
            <article className="book-card">
                <figure className="book-card-figure">
                    <div className="book-card-cover-wrapper">
                        <Image src={coverURL} alt={title} width={133} height={200} />
                    </div>
                </figure>
                <figcaption className="book-card-meta">
                    <h3 className="book-card-title">{title}</h3>
                    <p className="book-card-author">{author}</p>
                </figcaption>
            </article>
        </Link>
    )
}