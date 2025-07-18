// import React from "react";
// export type AdBannerProps = { position: "top" | "bottom" };
// const AdBanner = ({ position }: AdBannerProps) => {
//   return (
//     <div
//       style={{
//         width: "100%",
//         height: position === "top" ? 80 : 64,
//         background: "linear-gradient(90deg, #e0f2fe, #bbf7d0)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         borderBottom: position === "top" ? "1px solid #e5e7eb" : undefined,
//         borderTop: position === "bottom" ? "1px solid #e5e7eb" : undefined,
//       }}
//     >
//       <span style={{ color: "#64748b", fontSize: 14 }}>
//         Advertisement Space ({position === "top" ? "728x90" : "Responsive"})
//       </span>
//     </div>
//   );
// }
// export default AdBanner;


import React from "react";

export type AdBannerProps = { position: "top" | "bottom" };

const AdBanner = ({ position }: AdBannerProps) => {
  return (
    <div
      style={{
        width: "100%",
        height: position === "top" ? 80 : 64,
        background: "linear-gradient(90deg, #e0f2fe, #bbf7d0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: position === "top" ? "1px solid #e5e7eb" : undefined,
        borderTop: position === "bottom" ? "1px solid #e5e7eb" : undefined,
      }}
    >
      <span style={{ color: "#64748b", fontSize: 14 }}>
        Advertisement Space ({position === "top" ? "728x90" : "Responsive"})
      </span>
    </div>
  );
};

export default AdBanner;
