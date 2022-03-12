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