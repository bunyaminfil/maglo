"use client";

import Image from "next/image";

interface Card {
  bank: string;
  cardNumber: string;
  expiryMonth: number;
  expiryYear: number;
}

interface WalletSectionProps {
  cards: Card[];
}

export function WalletSection({ cards }: WalletSectionProps) {
  return (
    <div className="bg-white rounded-lg">
      {/* Wallet Header */}
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-lg font-semibold text-[#1B212D]">Wallet</h2>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer text-[#1B212D]">
          <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="19" cy="12" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="5" cy="12" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Credit Cards Stack */}
      <div className="relative h-48">
        {cards.length > 0 ? (
          <>
            {/* Primary Dark Card */}
            <div
              className="text-white p-6 shadow-lg relative"
              style={{
                width: '100%',
                height: '210px',
                background: `linear-gradient(104.3deg, #4A4A49 2.66%, #20201F 90.57%)`,
                borderRadius: '15px',
                opacity: 1,
              }}
            >
              <div className="flex justify-between items-start mb-4 w-full">
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white font-bold text-medium">Maglo.</span>
                    <div className="w-px h-4 bg-white opacity-60"></div>
                    <span className="text-[#626260] text-[12px]">{cards[0]?.bank}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3 w-full">
                    <Image
                      src="/icons/group.svg"
                      alt="group"
                      width={38}
                      height={30}
                    />
                    <Image
                      src="/icons/wifi.svg"
                      alt="wifi"
                      width={33}
                      height={34}
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <div className="flex text-xl font-mono font-bold tracking-wider">
                  {cards[0]?.cardNumber || '5495 7381 3759 2321'}
                </div>
                <div className="flex justify-between items-center mt-3 w-full">
                  <div className="text-xs text-[#929EAE] mt-1">
                    {cards[0]?.expiryMonth || 12}/{cards[0]?.expiryYear || 2027}
                  </div>
                  <Image
                    src="/icons/international.svg"
                    alt="wifi"
                    width={47}
                    height={36}
                  />
                </div>
              </div>
            </div>

            {/* Secondary Card */}
            {cards.length > 1 && (
              <div
                className="absolute p-4 shadow-lg"
                style={{
                  width: '94%',
                  height: '172px',
                  background: `linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)`,
                  borderRadius: '15px',
                  top: '140px',
                  left: '3%',
                  border: '0.5px solid',
                  borderImageSource: 'linear-gradient(114.49deg, rgba(255, 255, 255, 0.4) -41.08%, rgba(255, 255, 255, 0.1) 104.09%)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex justify-between items-start mb-4 w-full">
                  <div className="w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-bold text-medium">Maglo.</span>
                      <div className="w-px h-4 bg-white opacity-60"></div>
                      <span className="text-[#F5F5F5] text-[12px]">{cards[1]?.bank}</span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <Image
                        src="/icons/group.svg"
                        alt="group"
                        width={30}
                        height={24}
                      />
                      <Image
                        src="/icons/wifi.svg"
                        alt="wifi"
                        width={33}
                        height={34}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <div className="flex text-medium font-mono font-bold tracking-wider">
                    {cards[1]?.cardNumber?.replace(/\s/g, '')}
                  </div>
                  <div className="flex justify-between items-center mt-3 w-full">
                    <div className="text-xs text-[#929EAE] mt-1">
                      {cards[1]?.expiryMonth || 9}/{cards[1]?.expiryYear || 2025}
                    </div>
                    <Image
                      src="/icons/visa.svg"
                      alt="visa"
                      width={33}
                      height={34}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="h-40 flex items-center justify-center bg-gray-50 rounded-xl">
            <div className="text-center">
              <div className="text-4xl mb-2">💳</div>
              <p className="text-sm text-gray-500">No wallets available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

