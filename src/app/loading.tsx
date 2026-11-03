export default function Loading() {
  return <div className="page-width page-content" aria-label="Loading content" aria-busy="true"><div className="skeleton-line" style={{
      marginTop: 50
    }} /><div className="skeleton-line" style={{
      height: 65,
      width: "70%"
    }} /><div className="cards-grid">{[1, 2, 3].map(i => <div className="loading-block" key={i} />)}</div></div>;
}
