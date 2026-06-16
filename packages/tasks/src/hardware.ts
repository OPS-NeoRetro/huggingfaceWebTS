import { AMD_GPU_SKUS, AMD_CPU_SKUS } from "./hardware-amd.js";
import { NVIDIA_SKUS } from "./hardware-nvidia.js";
import { INTEL_CPU_SKUS, INTEL_GPU_SKUS } from "./hardware-intel.js";

/**
 * Biden AI Executive Order (since revoked by President Trump):
 * https://web.archive.org/web/20250105222429/https://www.whitehouse.gov/briefing-room/presidential-actions/2023/10/30/executive-order-on-the-safe-secure-and-trustworthy-development-and-use-of-artificial-intelligence/
 */
export const TFLOPS_THRESHOLD_WHITE_HOUSE_MODEL_TRAINING_TOTAL = 10 ** 14;
export const TFLOPS_THRESHOLD_WHITE_HOUSE_MODEL_TRAINING_TOTAL_BIOLOGY = 10 ** 11;
export const TFLOPS_THRESHOLD_WHITE_HOUSE_CLUSTER = 10 ** 8;

/**
 * EU AI Act
 * https://ec.europa.eu/commission/presscorner/detail/en/qanda_21_1683
 */
export const TFLOPS_THRESHOLD_EU_AI_ACT_MODEL_TRAINING_TOTAL = 10 ** 13;

export interface HardwareSpec {
	/**
	 * Approximate value, in FP16 whenever possible for GPUs and FP32 for CPUs.
	 * This is only approximate/theoretical and shouldn't be taken too seriously.
	 * Currently the CPU values are from cpu-monkey.com
	 * while the GPU values are from techpowerup.com
	 *
	 * Note to reviewers: I got fed up with data entry,
	 * and HuggingChat running Llama3 with Web search was failing a bit,
	 * so some of those values might be slightly inaccurate. Forgive me and please feel free to improve.
	 */
	tflops: number;
	/**
	 * If an array is specified, options of memory size (can be VRAM or unified RAM)
	 * e.g. an A100 exists in 40 or 80 GB.
	 */
	memory?: number[];
	/**
	 * Approximate MSRP in USD at launch. For SKUs with multiple memory variants,
	 * the price corresponds to the largest memory variant. For datacenter GPUs
	 * sold via OEMs without a public MSRP (H100, MI300X, ...), this is a
	 * widely-reported street price. For mobile/laptop GPUs that are not sold
	 * standalone, this is the approximate module/BOM cost. For Apple Silicon
	 * SoCs, this is the price of a Mac configured with that chip and the
	 * largest memory option.
	 */
	msrp: number;
	/**
	 * Approximate maximum sustained power draw in watts. For GPUs with multiple
	 * form factors (e.g. H100 SXM vs PCIe), uses the highest variant. For CPUs,
	 * uses max turbo power (PL2 / MTP for Intel, PPT for AMD), not base TDP.
	 * For Apple Silicon and Snapdragon SoCs, an estimated package power is based
	 * on benchmarks/teardowns (Apple does not publish TDP).
	 */
	power: number;
	/**
	 * Year the SKU first became available. For SKUs refreshed later with
	 * additional memory variants (e.g. A100 40GB → 80GB, RTX 2060 → 12GB),
	 * this is the original launch year. For CPU "family" entries, this is
	 * the year the family debuted.
	 */
	releaseYear: number;
}

export const DEFAULT_MEMORY_OPTIONS = [
	8, 16, 24, 32, 40, 48, 64, 80, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048,
];

export const SKUS = {
	GPU: {
		NVIDIA: NVIDIA_SKUS,
		AMD: AMD_GPU_SKUS,
		INTEL: INTEL_GPU_SKUS,
		QUALCOMM: {
			"Snapdragon X Elite X1E-00-1DE": {
				tflops: 4.6,
				msrp: 900,
				power: 80,
				releaseYear: 2024,
			},
			"Snapdragon X Elite X1E-84-100": {
				tflops: 4.6,
				msrp: 1_700,
				power: 30,
				releaseYear: 2024,
			},
			"Snapdragon X Elite X1E-80-100": {
				tflops: 3.8,
				msrp: 1_300,
				power: 23,
				releaseYear: 2024,
			},
			"Snapdragon X Elite X1E-78-100": {
				tflops: 3.8,
				msrp: 1_200,
				power: 23,
				releaseYear: 2024,
			},
			"Snapdragon X Plus X1P-64-100": {
				tflops: 3.8,
				msrp: 1_000,
				power: 23,
				releaseYear: 2024,
			},
		},
	},
	CPU: {
		Intel: INTEL_CPU_SKUS,
		AMD: AMD_CPU_SKUS,
	},
	"Apple Silicon": {
		"-": {
			"Apple MacBook Neo": {
				tflops: 1.9,
				memory: [8],
				msrp: 700,
				power: 10,
				releaseYear: 2026,
			},
			"Apple M1": {
				tflops: 2.6,
				memory: [8, 16],
				msrp: 1_250,
				power: 15,
				releaseYear: 2020,
			},
			"Apple M1 Pro": {
				tflops: 5.2,
				memory: [16, 24, 32],
				msrp: 2_900,
				power: 30,
				releaseYear: 2021,
			},
			"Apple M1 Max": {
				tflops: 10.4,
				memory: [16, 24, 32, 64],
				msrp: 3_900,
				power: 60,
				releaseYear: 2021,
			},
			"Apple M1 Ultra": {
				tflops: 21,
				memory: [16, 24, 32, 64, 96, 128],
				msrp: 6_200,
				power: 120,
				releaseYear: 2022,
			},
			"Apple M2": {
				tflops: 3.6,
				memory: [8, 16, 24],
				msrp: 1_500,
				power: 20,
				releaseYear: 2022,
			},
			"Apple M2 Pro": {
				tflops: 6.8,
				memory: [16, 24, 32],
				msrp: 2_800,
				power: 35,
				releaseYear: 2023,
			},
			"Apple M2 Max": {
				tflops: 13.49,
				memory: [32, 64, 96],
				msrp: 4_500,
				power: 80,
				releaseYear: 2023,
			},
			"Apple M2 Ultra": {
				tflops: 27.2,
				memory: [64, 96, 128, 192],
				msrp: 7_000,
				power: 150,
				releaseYear: 2023,
			},
			"Apple M3": {
				tflops: 4.1,
				memory: [8, 16, 24],
				msrp: 1_500,
				power: 22,
				releaseYear: 2023,
			},
			"Apple M3 Pro": {
				tflops: 7.4,
				memory: [18, 36],
				msrp: 2_400,
				power: 40,
				releaseYear: 2023,
			},
			"Apple M3 Max": {
				tflops: 14.2,
				memory: [36, 48, 64, 96, 128],
				msrp: 5_000,
				power: 90,
				releaseYear: 2023,
			},
			"Apple M3 Ultra": {
				tflops: 28.4,
				memory: [96, 256, 512],
				msrp: 9_500,
				power: 180,
				releaseYear: 2025,
			},
			"Apple M4": {
				tflops: 4.6,
				memory: [16, 24, 32],
				msrp: 1_600,
				power: 22,
				releaseYear: 2024,
			},
			"Apple M4 Pro": {
				tflops: 9.2,
				memory: [24, 48, 64],
				msrp: 2_600,
				power: 45,
				releaseYear: 2024,
			},
			"Apple M4 Max": {
				tflops: 18.4,
				memory: [36, 48, 64, 128],
				msrp: 5_000,
				power: 100,
				releaseYear: 2024,
			},
			"Apple M5": {
				tflops: 5.7,
				memory: [16, 24, 32],
				msrp: 2_000,
				power: 25,
				releaseYear: 2025,
			},
			"Apple M5 Pro": {
				tflops: 11.4,
				memory: [24, 36, 48, 64],
				msrp: 2_900,
				power: 50,
				releaseYear: 2026,
			},
			"Apple M5 Max": {
				tflops: 22.8,
				memory: [36, 48, 64, 128],
				msrp: 5_000,
				power: 110,
				releaseYear: 2026,
			},
		},
	},
} satisfies Record<string, Record<string, Record<string, HardwareSpec>>>;

export type SkuType = keyof typeof SKUS;
