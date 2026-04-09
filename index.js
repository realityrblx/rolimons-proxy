const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/item/:assetId", async (req, res) => {
	const { assetId } = req.params;
	try {
		const r = await fetch("https://www.rolimons.com/itemapi/itemdetails", {
			headers: { "User-Agent": "Mozilla/5.0" }
		});
		const data = await r.json();
		const item = data.items?.[assetId];
		if (!item) return res.status(404).json({ error: "Item not found" });

		res.json({
			rap: item[2],
			value: item[3],
			demand: item[5],
		});
	} catch (e) {
		res.status(500).json({ error: "Failed", detail: e.message });
	}
});

app.listen(process.env.PORT || 3000, () => console.log("Running on port " + (process.env.PORT || 3000)));

app.get("/itemtype/:assetId", async (req, res) => {
	const { assetId } = req.params;
	try {
		const r = await fetch(`https://api.roblox.com/marketplace/productinfo?assetId=${assetId}`, {
			headers: { "User-Agent": "Mozilla/5.0" }
		});
		const data = await r.json();
		if (!data) return res.status(404).json({ error: "Not found" });

		res.json({
			type: data.AssetTypeId,
			name: data.Name,
		});
	} catch (e) {
		res.status(500).json({ error: "Failed", detail: e.message });
	}
});