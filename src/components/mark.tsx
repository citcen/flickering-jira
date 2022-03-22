export const Mark = ({ name, keyword }: { name: string; keyword?: string }) => {
  if (!keyword) return <div>{name}</div>;

  const nameArr = name.split(keyword);

  return (
    <div>
      {nameArr.map((str, index) => (
        <span key={index}>
          {str}
          {index === nameArr.length - 1 ? null : (
            <span style={{ color: "#257AFD" }}>{keyword}</span>
          )}
        </span>
      ))}
    </div>
  );
};
