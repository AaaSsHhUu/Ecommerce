import ContentLoader from "react-content-loader";

const Loader = () => {
  return (
    <section className="loader">
        <div></div>
    </section>
  )
}

export const ProductSkeleton = () => {
    return(
        <ContentLoader
          speed={1}
          width={210}
          height={300}
          viewBox="0 0 210 300"
          backgroundColor="#b0b0b0"
          foregroundColor="#eee"
        >
          <rect x="10" y="8" rx="3" ry="3" width="200" height="150" />
          <rect x="10" y="180" rx="3" ry="3" width="200" height="30" />
          <rect x="10" y="220" rx="3" ry="3" width="200" height="30" />
        </ContentLoader>
    )
}

export default Loader


