import Image from "next/image";

export default function Card({ props }) {
  return (
    <div className="card grid grid-cols-1 bg-base-100 shadow-xl h-full">
      <figure className="relative self-start">
        <Image
          src={`https://strapi.6ixarchive.com${props.itemPic[0]?.url}`}
          alt="Clothing item"
          width={100}
          height={100}
          sizes="80vw"
          className="w-full h-auto"
        />
      </figure>
      <div className="card-body self-end">
        <h2 className="card-title">{props.brand}</h2>
        {props.seasonyear && <p>{props.seasonyear}</p>}
        <p>{props.itemName}</p>
        <p>{`€${props.itemPrice}`}</p>
        {/* <div className="card-actions justify-end"> */}
        {/* <button className="btn btn-primary">Buy Now</button> */}
        {/* </div> */}
      </div>
    </div>
  );
}
