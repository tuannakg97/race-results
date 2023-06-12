interface ResultItemProps {
  imgUrl: string | undefined;
  title: string | undefined;
  subtitle: string | undefined;
  onClick: () => void;
}

function ResultItem({ imgUrl, title, subtitle, onClick }: ResultItemProps) {
  return (
    <div className="search_result_item" onClick={onClick}>
      <div
        className="search_result_item_avata"
        style={{ backgroundImage: `url(${imgUrl || 'https://as1.ftcdn.net/v2/jpg/03/21/62/96/1000_F_321629644_lC8nXfiPOm31JdrzO5vdRTaCrCuFjAiL.jpg'})` }}
      ></div>

      <div className="search_result_item_text">
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
      </div>
    </div>
  );
}

export default ResultItem;
