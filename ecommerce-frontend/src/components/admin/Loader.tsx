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


export const TableSkeleton = () => {
    return(
      <ContentLoader
        speed={1}
        width={'95%'}
        height={"80vh"}
        viewBox="0 0 100% 100%" // min-x min-y width height
        backgroundColor="#b0b0b0"
        foregroundColor="#eee"
      >
        <rect x={60} y={10} rx={3}  ry="3" width={'100%'} height={70}/>
        <rect x={60} y={100} rx={3}  ry="3" width={'100%'} height={70}/>
        <rect x={60} y={190} rx={3}  ry="3" width={'100%'} height={70}/>
        <rect x={60} y={280} rx={3}  ry="3" width={'100%'} height={70}/>
        <rect x={60} y={370} rx={3}  ry="3" width={'100%'} height={70}/>
        <rect x={60} y={460} rx={3}  ry="3" width={'100%'} height={70}/>
      </ContentLoader>
    )
}

export const ProductDetailSkeleton = () => {
  return (
    <ContentLoader
      speed={1}
      width={'95%'}
      height={'80vh'}
      viewBox="0 0 100% 100%"
      backgroundColor="#b0b0b0"
      foregroundColor="#eee"
    >
        <rect x={50} y={30} rx={3}  ry="3" width={400} height={'90vh'}/>
        <rect x={460} y={30} rx={3}  ry="3" width={400} height={'90vh'}/>
    </ContentLoader>
  )
}
export default Loader


