import React from "react";
import top1 from "@/assets/top1.png";
import top2 from "@/assets/top2.png";
import top3 from "@/assets/top3.png";
import "./styles.scss";
import clsx from "clsx";
import { defaultImage } from "@/constants/images";

interface MediumCardProps {
  title: string | React.ReactNode;
  subtitle: string;
  primary: string;
  children?: React.ReactNode;
  imgUrl?: string;
  pos?: number;
}

function Card({
  title,
  subtitle,
  primary,
  imgUrl = defaultImage,
  children,
  pos,
}: MediumCardProps) {
  return (
    <div
      className={clsx([
        "mdCard",
        pos ? `mdCard--border mdCard--border${pos}` : "",
      ])}
    >
      {pos && (
        <div className="mdCard_badge">
          {pos === 1 ? (
            <img src={top1} className="mdCard_badge--1" />
          ) : pos === 2 ? (
            <img src={top2} className="mdCard_badge--2" />
          ) : (
            <img src={top3} className="mdCard_badge--2" />
          )}
        </div>
      )}

      <div
        className="mdCard_image"
        style={{ backgroundImage: `url(${imgUrl})` }}
      />
      <div className="mdCard_content">
        <p className="mdCard_content_title">{title}</p>
        <p className="mdCard_content_subtitle">{subtitle}</p>
        <p className="mdCard_content_primary">{primary}</p>
        {children}
      </div>
    </div>
  );
}

export default Card;
