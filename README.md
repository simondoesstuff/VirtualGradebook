# Test Runner

This test runner is based on the PyTest framework. PyTest already scans and executes tests as
a part of their framework, so we did our best to re-use as much of their existing technology as
possible. After tests are discovered, the test case objects can be passed to `testExecution` in
an array to be run. Any tests can be omitted.

Test discovery and execution information is automatically stored in `testDiscovery.json` and
`testExecution.json`. `testDiscovery` searches for tests in the current python repository.
It will recursively search directories.

*Note that PyTest does **not** support test suites.*

## Usage

See [Demo.py](./Demo.py)


```py
from DiscoverTests import testDiscovery
from ExecuteTests import testExecution


# here we perform discovery
# the discovered tests are automatically saved to 'testDiscovery.json'
# results are also printed
disc = testDiscovery()

# here we perform execution
# the test results are automatically saved to 'testExecution.json'
# results are also printed
testExecution(disc["testCases"])
```
