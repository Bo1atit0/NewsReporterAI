from newreporter_backend.services.sample_service import echo_message


def test_echo_message_trims_spaces():
    assert echo_message("  hello  ") == "hello"
    assert echo_message("hello") == "hello"
    assert echo_message("") == ""
