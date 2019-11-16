module.exports = {
	"plugins": [
        "jsdoc"
    ],
	"env": {
		"commonjs": true,
		"es6": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:jsdoc/recommended"
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],

		"require-jsdoc": [
			"error",
			{
				require: {
					"ArrowFunctionExpression": true,
					"ClassDeclaration": true,
					//Enabling this throws an error
					//"ClassExpression": true,
					"FunctionDeclaration": true,
					"FunctionExpression": true,
					"MethodDefinition": true
				}
			}
		]
	}
};
