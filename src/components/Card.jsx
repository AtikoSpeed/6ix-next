import Image from "next/image";

export default function Card({ props }) {
  console.log(props);
  return (
    <div className="card grid grid-cols-1 bg-base-100 shadow-xl h-min lg:h-full">
      <figure className="relative self-start">
        <Image
          src={`${props.itemPic.data.attributes.url}`}
          alt="Clothing item"
          width={100}
          height={100}
          sizes="80vh"
          className="w-full h-auto"
        />
      </figure>
      <div className="card-body self-end">
        <h2 className="card-title">{props.brand}</h2>
        {props.seasonyear && <p>{props.seasonyear}</p>}
        <p>{props.name}</p>
        <p>{`€ ${props.itemPrice || "Gratis"}`}</p>
        {/* <div className="card-actions justify-end"> */}
        {/* <button className="btn btn-primary">Buy Now</button> */}
        {/* </div> */}
      </div>
    </div>
  );
}
