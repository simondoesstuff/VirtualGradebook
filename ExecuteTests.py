# print(pytest.main(["test_crap.py::test_capital_case"]))       # run tests
# print(pytest.main(["--co"]))                                  # find tests
# output = io.StringIO()                                        # pipe std out
# with redirect_stdout(output):
import io
import json
import re
from contextlib import redirect_stdout
import pytest
from _pytest.config import ExitCode


def testExecution(tests):
    feedback = dict()

    # Discover the tests
    for test in tests:
        outIO = io.StringIO()

        with redirect_stdout(outIO):
            module = test["file"]
            testId = test["label"]

            exitCode = pytest.main([f"{module}::{testId}"])

            # store the feedback
            feedback[testId] = outIO.getvalue()
            outIO.close()

    # Begin Parsing:

    testResults = list()

    for testId, content in feedback.items():
        lines = content.split('\n')
        lines = list(filter(lambda line: len(line) != 0, lines))

        m = re.match(r"=+ \d (\w+) in (.+[a-zA-Z]) =+", lines[-1])
        # this regex should ALWAYS match
        assert m

        status = m[1]
        duration = m[2]

        result = {
            "id": testId,
            "status": status,
            "duration": duration
        }

        # in the case that the test failed, we can also get the error feedback message

        if status == "failed":
            m = re.search(r"\n=+ short test summary info =+\n(.*)\n", content)

            if m:
                errorMsg = m[1]
                result["failureMsg"] = errorMsg

        testResults.append(result)

    # Return the test results

    testResults = {
        "testCases": testResults,
        "testSuites": []
    }

    toJson = json.dumps(testResults, indent=2)
    print("Executed Tests.")
    print(toJson)

    with open("testExecution.json", "w") as f:
        f.write(toJson)

    return testResults

