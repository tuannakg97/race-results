import React from "react";

interface ResultItemProps {
  imgUrl: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}

function ResultItem({ imgUrl, title, subtitle, onClick }: ResultItemProps) {
  return (
    <div className="search_result_item" onClick={onClick}>
      <div
        className="search_result_item_avata"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>

      <div className="search_result_item_text">
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
      </div>
    </div>
  );
}

export default ResultItem;
