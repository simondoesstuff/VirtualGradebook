import pytest
from contextlib import redirect_stdout

with redirect_stdout(None):

# print(pytest.main(["test_crap.py::test_capital_case"]))

print(
    pytest.main(["--co"])
)