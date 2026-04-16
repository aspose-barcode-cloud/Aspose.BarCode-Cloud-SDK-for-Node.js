import argparse
import os
import re
import typing

REPLACE_RE = re.compile(r'^%insert (?P<file_name>[^%]+)%$', re.MULTILINE)


def read_text(filename: str) -> str:
    with open(filename, "rt") as rf:
        text = rf.read()
    return text


def main(template: typing.TextIO) -> None:
    content: str = template.read()

    def sub_match(match):
        file_name = match.group('file_name')
        return read_text(file_name)

    text = REPLACE_RE.sub(sub_match, content)
    print(text, end="")


def parse_args() -> typing.Dict[str, typing.Any]:
    parser = argparse.ArgumentParser()
    parser.add_argument("template", type=argparse.FileType("rt"), help="README.template")
    kwargs = vars(parser.parse_args())
    return kwargs


if __name__ == "__main__":
    main(**parse_args())
