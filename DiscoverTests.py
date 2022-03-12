import json
import re
import pytest
from pytest import ExitCode
from contextlib import redirect_stdout
import io


# print(pytest.main(["test_crap.py::test_capital_case"]))       # run tests
# print(pytest.main(["--co"]))                                  # find tests
# output = io.StringIO()                                        # pipe std out
# with redirect_stdout(output):

def testDiscovery():
    outIO = io.StringIO()
    exitCode = None

    # Discover the tests
    with redirect_stdout(outIO):
        exitCode = pytest.main(["--co"])

    # store the contents
    contents = outIO.getvalue()
    outIO.close()
    outIO = None  # no longer need this

    if exitCode != ExitCode.OK:
        # failed to find any tests. There was an issue.
        print(contents)
        return {
            "testCases": [],
            "testSuites": []
        }

    # Begin Parsing:

    lines = contents.split("\n")
    moduleName = None
    tests = list()

    for line in lines:
        m = re.match(r"\s*<(Function|Module) (\w.*)>", line)

        if not m:
            continue

        if m[1] == "Module":
            moduleName = m[2]
        else:
            assert m[1] == "Function"  # this should absolutely be true

            tests.append({
                "id": f"{moduleName}::{m[2]}",
                "label": m[2],
                "file": moduleName,
                "test-suites": []
            })

    # Return the tests

    tests = {
        "testCases": tests,
        "testSuites": []
    }

    toJson = json.dumps(tests, indent=2)
    print("Discovered Tests.")
    print(toJson)

    with open("testDiscovery.json", "w") as f:
        f.write(toJson)

    return tests
