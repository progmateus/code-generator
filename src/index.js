#!/usr/bin/env node

import yargs from "yargs";
import {
    hideBin
} from "yargs/helpers"
import {
    createFiles
} from "./createFiles.js";
import {
    createLayersIfNotExists
} from "./createLayers.js";


const {
    argv: {
        componentName
    }
} = yargs(hideBin(process.argv))
    .command("skeleton", "create project skeleton", (builder) => {
        return builder
            .option("component-name", {
                alias: "c",
                demandOption: true,
                describe: 'component\'s name',
                type: "array"
            })
            .example("skeleton --component-name product", "creates a project with a single domain")
            .example("skeletin -c product -c person -c colors", "create a project with a list of domain")
    })
    .epilog('copyrigth 2022 - @progmateus')


const env = process.env.NODE_ENV
const defaultMainFolder = env === "dev" ? "tmp" : "src"

const layers = ["repository", "service", "factory"].sort()
const config = {
    layers,
    defaultMainFolder,
    mainPath: "."
}

await createLayersIfNotExists(config)

const penddingPromises = [];
for (const domain of componentName) {
    const result = createFiles({
        ...config,
        componentName: domain
    })
    penddingPromises.push(result)
}

await Promise.all(penddingPromises);