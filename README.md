# version-checker-cli [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] 

> Check your outdated node packages with command line.

## Installation

```sh
$ npm install -g version-checker-cli
```

## Usage

#### Check packages

```
// Check all local packages
$ vc check --local
//or
$ vc check -l
```

![image](./local.png =100x20)

```
// Check all global packages
$ vc check --global
//or
$ vc check -g
```

![image](./global.png =100x20)

```
// Check all packages in prefix path
$ vc check --prefix
//or
$ vc check -p
```

![image](./prefix.png =100x20)

#### Update packages

```
// Update all local packages
$ vc update --local
//or
$ vc update -l

// Update all global packages
$ vc update --global
//or
$ vc update -g
```

## Options

```
$ vc -h
Usage:
  vc [OPTIONS] <command> [ARGS]

Options: 
  -l, --local            Perform locally.
  -g, --global           Perform globally.
  -p, --prefix           Perform at your npm prefix path.
  -a, --all              Perform locally, globally, and at your npm prefix 
                         path. 
  -v, --version          Display the current version.
  -h, --help             Display help and usage details.

Commands: 
  check, update

```

## License

MIT © [NghiaTTran]()

<!-- [![Coverage percentage][coveralls-image]][coveralls-url] -->

[npm-image]: https://badge.fury.io/js/version-checker-cli.svg
[npm-url]: https://npmjs.org/package/version-checker-cli
[travis-image]: https://travis-ci.org/nghiattran/version-checker-cli.svg?branch=master
[travis-url]: https://travis-ci.org/nghiattran/version-checker-cli
[daviddm-image]: https://david-dm.org/nghiattran/version-checker-cli.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/nghiattran/version-checker-cli
[coveralls-image]: https://coveralls.io/repos/nghiattran/version-checker-cli/badge.svg
[coveralls-url]: https://coveralls.io/r/nghiattran/version-checker-cli