function Thumbnail({ result }) {
  console.log('result', result);
  return (
    <div>
      <h2>{result.name}</h2>
    </div>
  );
}

export default Thumbnail;
