import React, { useState, useEffect, useTransition } from "react";
import { Counter } from "./Counter.js";
import { onGenerateUserPrize } from "./GeneratePrize.telefunc";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Button, Group, Badge, Box, Text } from "@mantine/core";
const colorCode = {
	regular: "green",
	special: "blue",
	rare: "red",
};
export default function Page() {
	const data = useData<Data>();
	const [currentPrize, setCurrentPrize] = useState(() => data[0]);
	const [prizes, setPrizes] = useState(() => data);
	const [isPending, startTransition] = useTransition();
	const handlePrizeGenerate = () => {
		startTransition(async () => {
			const awaitedPrizes = await onGenerateUserPrize();
			setCurrentPrize(awaitedPrizes[0]);
			setPrizes(awaitedPrizes);
		});
	};
	return (
		<>
			<Button
				loading={isPending}
				disabled={isPending}
				onClick={() => handlePrizeGenerate()}
			>
				Generate Prize
			</Button>
			<Box
				align="center"
				my="md"
				bd="1"
				maw={300}
				mx="auto"
				bg={`${colorCode[currentPrize.prizeType]}.1`}
				style={{ backgroundColor: "white", borderRadius: 10, padding: 20 }}
			>
				<Text
					size="xl"
					weight="bold"
					align="center"
					color={colorCode[currentPrize.prizeType]}
					style={{
						fontSize: 50,
						transform: "rotate(-4deg)",
						textTransform: "uppercase",
					}}
				>
					{currentPrize.prizeType}
				</Text>
			</Box>
			<Group spacing="xs" py="md">
				{prizes.map((prize) => (
					<Badge color={colorCode[prize.prizeType]} key={prize.id}>
						{prize.prizeType}
					</Badge>
				))}
			</Group>
		</>
	);
}
