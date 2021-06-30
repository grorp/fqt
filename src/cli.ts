#!/usr/bin/env node

import { parseTemplate, makeTemplateFunction } from "./fqt.js";
import { readFile, writeFile } from "fs/promises";

(async function () {
	const args = process.argv.slice(2);
	const templateFilePath = args[0];
	const dataFilePath = args[1];
	const outputFilePath = args[2];

	if (!templateFilePath || !dataFilePath || !outputFilePath) {
		console.error("Usage: fqt <template file> <JSON data file> <output file>");
		process.exit(1);
	}

	try {
		const template = (await readFile(templateFilePath)).toString();
		const data = JSON.parse((await readFile(dataFilePath)).toString());
		const fn = makeTemplateFunction(parseTemplate(template));
		const output = fn(data);
		writeFile(outputFilePath, output);
	} catch (error) {
		console.error(error.toString());
		process.exit(1);
	}
})();
