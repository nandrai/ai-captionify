import React, { createContext, useContext, useState } from "react";

type DataContextProps = {
  children: React.ReactNode;
};

type ToneContextDataType = {
  toneData: any;
  setToneData: React.Dispatch<React.SetStateAction<string>>;
}[];

type TargetContextDataType = {
  targetData: any;
  setTargetData: React.Dispatch<React.SetStateAction<string>>;
}[];

type LengthContextDataType = {
  lengthData: string | {};
  setLengthData: React.Dispatch<React.SetStateAction<string>>;
};

export const ToneContext = createContext<ToneContextDataType | null>(null);
export const TargetContext = createContext<TargetContextDataType | null>(null);
export const LengthContext = createContext<LengthContextDataType | null>(null);

const DataContext = ({ children }: DataContextProps) => {
  const [toneData, setToneData] = useState<ToneContextDataType>([]);
  const [targetData, setTargetData] = useState<TargetContextDataType>([]);
  // @ts-ignore
  const [lengthData, setLengthData] = useState<LengthContextDataType>({});

  return (
    // @ts-ignore
    <ToneContext.Provider value={{ toneData, setToneData }}>
      {/* @ts-ignore */}
      <TargetContext.Provider value={{ targetData, setTargetData }}>
        {/* @ts-ignore */}
        <LengthContext.Provider value={{ lengthData, setLengthData }}>
          {children}
        </LengthContext.Provider>
      </TargetContext.Provider>
    </ToneContext.Provider>
  );
};

export const useToneContext = () => {
  const context = useContext(ToneContext);
  if (!context) {
    console.log("useToneContext must be used within a DataContext");
  }
  return context;
};

export const useTargetContext = () => {
  const context = useContext(TargetContext);
  if (!context) {
    console.log("useTargetContext must be used within a DataContext");
  }
  return context;
};

export const useLengthContext = () => {
  const context = useContext(LengthContext);
  if (!context) {
    console.log("useLengthContext must be used within a DataContext");
  }
  return context;
};

export default DataContext;
