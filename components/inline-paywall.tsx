"use client"

import { useState, useRef, useEffect } from "react"
import { CheckCircle, ChevronRight, LogIn, ArrowRight, Info, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import LottieAnimation from "./lottie-animation"

// Product data type
interface Product {
  _id: string
  name: string
  price_firstmonth: string
  price_full: string
}

// Fetch product data from API
const fetchProductData = async (): Promise<Product[]> => {
  try {
    const response = await fetch("https://brukermarkedtest-5a3d.restdb.io/rest/products", {
      headers: {
        "x-api-key": "680b5f8972702c5e96b3d2a4",
      },
    })

    if (!response.ok) {
      throw new Error("API request failed")
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch product data:", error)
    // Fallback data if API fails
    return [
      {
        _id: "1",
        name: "Digital",
        price_firstmonth: "1",
        price_full: "149",
      },
    ]
  }
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
      delay: 0.2,
    },
  },
  tap: {
    scale: 0.95,
    rotate: 0,
    transition: { duration: 0.1 },
  },
}

const pulseAnimation = {
  boxShadow: ["0 4px 6px rgba(0, 0, 0, 0.1)", "0 10px 15px rgba(0, 0, 0, 0.15)", "0 4px 6px rgba(0, 0, 0, 0.1)"],
  transition: {
    duration: 2,
    repeat: Number.POSITIVE_INFINITY,
    repeatType: "reverse",
  },
}

export default function InlinePaywall() {
  const [productData, setProductData] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [youthDiscount, setYouthDiscount] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const paywallRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getProductData = async () => {
      try {
        const products = await fetchProductData()
        if (products && products.length > 0) {
          setProductData(products[0])
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error)
      } finally {
        setIsLoading(false)
        // Add a small delay before showing the animation
        setTimeout(() => setIsVisible(true), 100)
      }
    }

    getProductData()

    // Set up intersection observer for entrance animation
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (paywallRef.current) {
      observer.observe(paywallRef.current)
    }

    return () => {
      if (paywallRef.current) {
        observer.unobserve(paywallRef.current)
      }
    }
  }, [isVisible])

  if (isLoading) {
    return (
      <div className="my-8 p-6 bg-gray-100 rounded-lg animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>
        <div className="h-10 bg-gray-300 rounded w-1/3"></div>
      </div>
    )
  }

  return (
    <div ref={paywallRef} className="my-8 relative">
      {/* Subtle gradient fade effect at the top */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>

      <motion.div
        className="border border-gray-200 overflow-hidden shadow-lg bg-white will-change-transform"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        style={{
          transformOrigin: "center",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "subpixel-antialiased",
          borderRadius: "2.5rem",
        }}
      >
        {/* Vipp-flipp badge in top-right corner */}
        <motion.div
          className="absolute -top-1 md:-top-1 right-0 w-16 h-16 md:w-24 md:h-24 z-10 overflow-visible"
          variants={badgeVariants}
          whileTap="tap"
        >
          <Image
            src="/vipp-flipp-top-right.svg"
            alt="Vipp-flipp tilbud"
            width={96}
            height={96}
            className="object-contain object-top w-16 h-16 md:w-24 md:h-24"
            priority
          />
        </motion.div>

        {/* Header */}
        <motion.div
          className="bg-[#005379] p-3 pb-4 text-white text-center relative overflow-hidden"
          variants={itemVariants}
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl transform -translate-x-20 translate-y-20"></div>
          </div>

          <motion.h3
            className="text-2xl md:text-4xl font-bold mb-0.5 font-display text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          >
            Vil du lese videre?
          </motion.h3>

          <motion.p
            className="text-white/90 text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Få tilgang til hele artikkelen og alt annet innhold
          </motion.p>
        </motion.div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Animation area - Lottie animation */}
          <motion.div className="mb-4" variants={itemVariants}>
            <div className="w-full mx-auto">
              <motion.div
                className="w-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
              >
                <LottieAnimation
                  src="https://lottie.host/c264d2d1-a5b6-4a35-acd2-ce23c7500b1b/2xjTIkHRCY.lottie"
                  width="100%"
                  height="auto"
                  loop={false}
                  className="mx-auto"
                  style={{ minHeight: "250px", maxHeight: "400px" }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Product name and pricing */}
          <motion.div className="text-center mb-2" variants={itemVariants}>
            <h4 className="text-xl font-bold text-[#005379] mb-1">{productData?.name || "Digital"} abonnement</h4>
            <p className="text-sm text-gray-600 mb-2">Få full tilgang til alle artikler og eksklusivt innhold</p>
          </motion.div>

          {/* Main CTA */}
          <motion.div className="w-full" variants={itemVariants}>
            <motion.div
              whileHover={{
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              whileTap={{
                transition: { type: "spring", stiffness: 500, damping: 10 },
              }}
              animate={pulseAnimation}
            >
              <Button
                className="w-full bg-[#005379] hover:bg-[#00436a] text-white text-lg py-6 px-4 shadow-md transition-all duration-300 relative overflow-hidden group hover:shadow-lg"
                style={{ borderRadius: "1.5rem" }}
                onClick={() => window.location.href = "https://www.adressa.no/dakapo/productpage/ADR/"}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                />
                <div className="flex items-center justify-center gap-2 relative z-10">
                  <span className="text-lg font-bold">{productData?.price_firstmonth || "1"}</span>
                  <span className="text-base font-medium">kr første måned</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                  >
                    <ArrowRight className="h-5 w-5 ml-1" />
                  </motion.div>
                </div>
              </Button>

            </motion.div>

            {/* Price info with click interaction */}
            <motion.div
              className="flex items-center justify-center mt-2 cursor-pointer group transition-all duration-200"
              onClick={() => setShowTerms(!showTerms)}
              whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              whileTap={{
                scale: 0.97,
                transition: { type: "spring", stiffness: 500, damping: 10 },
              }}
              variants={itemVariants}
              layout
              transition={{
                layout: { type: "spring", stiffness: 300, damping: 30 },
                default: { duration: 0.3, ease: "easeInOut" },
              }}
            >
              <span className="text-xs text-gray-500 mr-1">deretter </span>
              {youthDiscount ? (
                <span className="text-sm font-medium text-[#28AAE2] group-hover:underline transition-all duration-300">
                  {Math.round(Number.parseInt(productData?.price_full || "149") * 0.8)} kr/md.
                  <motion.span
                    className="ml-1 text-xs bg-[#28AAE2]/10 text-[#28AAE2] px-1.5 py-0.5 rounded-full"
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    Ung-rabatt
                  </motion.span>
                </span>
              ) : (
                <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 group-hover:underline transition-all duration-300">
                  {productData?.price_full || "149"} kr/md.
                </span>
              )}
              <motion.div
                animate={{
                  rotate: showTerms ? 180 : 0,
                  y: showTerms ? 1 : -1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 0.8,
                }}
              >
                <ChevronDown className="h-3 w-3 ml-1" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Already a subscriber */}
          <motion.div variants={itemVariants}>
            <Button
              variant="ghost"
              className="w-full text-[#28AAE2] hover:text-[#005379] hover:bg-gray-50 text-sm py-1.5 transition-all duration-200 group"
              onClick={() => window.location.href = "https://payment.schibsted.no/authn/?client_sdrn=sdrn%3Aspid.no%3Aclient%3A5357ab1b431c7ad251000005&prompt=select_account&client_id=5357ab1b431c7ad251000005&nonce=2331f344-338a-47a5-a089-64fc02161602&state=676d1ee3c5ca7238c0a840da1ca8ff62d82c683f16d9d46dcac0ba1fd01d974a73fc4c99aeee1e1be8512710c9ac011cd1454e32f040de970cea8e53e0c94f79c15b3e0c95f62246b4df0dfad210df61143546244d66253e5e302b9d537c17b3013ba3939e079742737e0d7ecba4ff62254c874cd8d7c4010cebf74952be0a28"} 
            >
              <span className="flex items-center justify-center gap-1.5">
                <LogIn className="h-3.5 w-3.5 transition-colors duration-200" />
                Er du allerede abonnent? Logg inn
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </motion.div>
              </span>
            </Button>
          </motion.div>

          {/* Youth discount toggle */}
          <motion.div
            className="flex items-center justify-between p-3 bg-[#28AAE2]/5 border border-[#28AAE2]/20"
            style={{ borderRadius: "1.25rem" }}
            variants={itemVariants}
            whileHover={{ boxShadow: "0 2px 8px rgba(40, 170, 226, 0.1)" }}
          >
            <Label htmlFor="youth-discount" className="font-medium cursor-pointer text-gray-800 text-sm">
              Jeg er under 34 og ønsker Ung-rabatt
            </Label>
            <Switch
              id="youth-discount"
              checked={youthDiscount}
              onCheckedChange={setYouthDiscount}
              className="data-[state=checked]:bg-[#28AAE2] hover:ring-2 hover:ring-[#28AAE2]/20 transition-all duration-200"
            />
          </motion.div>

          {/* Features accordion */}
          <motion.div variants={itemVariants}>
            <Accordion type="single" collapsible className="w-full mt-0">
              <AccordionItem value="features" className="border-b-0 border-t-0">
                <AccordionTrigger className="py-2 text-sm font-medium text-[#005379] hover:text-[#28AAE2] hover:no-underline">
                  <span className="flex items-center">
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                    Se hva som er inkludert
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <motion.ul
                    className="space-y-3 p-3 bg-[#f8fafc] border border-gray-100"
                    style={{ borderRadius: "1.25rem" }}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.05,
                        },
                      },
                    }}
                  >
                    {[
                      "Alt innhold på adressa.no",
                      "Trøndersk næringslivsnyt",
                      "Podkaster og videoinnhold",
                      "Familiedeling",
                    ].map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        whileHover={{ x: 3 }}
                      >
                        <motion.span
                          className="flex-shrink-0 mt-0.5 mr-2.5 rounded-full p-1 bg-[#28AAE2]/20 text-[#005379]"
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(40, 170, 226, 0.3)" }}
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                        </motion.span>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>

        {/* Footer with Terms */}
        <motion.div className="bg-gray-50 p-3 border-t border-gray-200" variants={itemVariants}>
          <div className="flex items-center justify-center">
            <motion.button
              onClick={() => setShowTerms(!showTerms)}
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Info className="h-3 w-3" />
              Vilkår
              <motion.div animate={{ rotate: showTerms ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="h-3 w-3" />
              </motion.div>
            </motion.button>
          </div>

          <AnimatePresence>
            {showTerms && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-2 px-2"
              >
                <p className="text-center text-xs text-gray-500">
                  Ingen binding. Avslutt når du vil på Min Side. Fornyes automatisk til ordinær pris. (
                  {productData?.name || "Digital"}:{" "}
                  <span className="font-medium">
                    {youthDiscount
                      ? Math.round(Number.parseInt(productData?.price_full || "149") * 0.8)
                      : productData?.price_full || "149"}
                    ,-/md.
                  </span>
                  )
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Locked content indicator */}
      <div className="relative mt-12 mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/90 to-white pointer-events-none"></div>
        <div className="space-y-4 opacity-50">
          <p className="text-gray-500 select-none">
            De første anmeldelsene har vært overveldende positive, med brukere som roser appens elegante design og
            intuitive funksjoner.
          </p>
          <p className="text-gray-500 select-none">
            ByteBloom planlegger å rulle ut nye oppdateringer i ukene som kommer, inkludert integrasjon med populære
            kalenderapper og stemmestyring.
          </p>
        </div>
      </div>
    </div>
  )
}
