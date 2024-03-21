using System;
using System.Text;
using Microsoft.Maui.Controls;
using System.Text.RegularExpressions;

namespace clean_snippets_app;

public partial class MainPage : ContentPage
{
    public MainPage()
    {
        InitializeComponent();
        inputArea.Text = string.Empty;
        outputArea.Text = string.Empty;
        cleanAllToggle.IsChecked = true;
        SetAllTogglesState(true);
        UpdateCharacterCount();
        SizeChanged += OnPageSizeChanged;
    }

    private void OnPageSizeChanged(object sender, EventArgs e)
    {
        // Recalculate other elements' height if it changes with window size or orientation
        double otherElementsHeight = CalculateNonDynamicElementsHeight();

        // Ensure there's a buffer or margin considered for a more flexible layout
        double layoutBuffer = CalculateLayoutBuffer();

        // Calculate available height more precisely
        double availableHeight = Height - otherElementsHeight - layoutBuffer - (Padding.Top + Padding.Bottom);

        // Adjust the division factor based on your observations and requirements
        double divisionFactor = 2.5; // Example adjustment based on trial and observation

        double dynamicAreaHeight = availableHeight / divisionFactor;

        inputFrame.HeightRequest = dynamicAreaHeight;
        outputFrame.HeightRequest = dynamicAreaHeight;
    }

    private double CalculateNonDynamicElementsHeight()
    {
        // Adjust this calculation as needed
        return 200; // Placeholder, calculate based on actual UI elements
    }

    private double CalculateLayoutBuffer()
    {
        // Define a buffer to account for margins/paddings not covered elsewhere
        // This helps in ensuring there's a 'breathing room' in the layout, preventing it from feeling too packed
        return 50; // This is an example value. Adjust based on your layout's needs.
    }



    private void UpdateCharacterCount()
    {
        var inputLength = inputArea.Text?.Length ?? 0;
        var outputLength = outputArea.Text?.Length ?? 0;
        inputCharCount.Text = $"{inputLength} characters";
        outputCharCount.Text = $"{outputLength} characters";
    }

    private void OnCleanButtonClicked(object sender, EventArgs e)
    {
        if (string.IsNullOrWhiteSpace(inputArea.Text))
        {
            // Optionally, show a message indicating the input area is empty
            return;
        }

        string cleanedCode = inputArea.Text;

        // Example: Cleaning comments based on a checkbox being checked
        if (cleanSvgToggle.IsChecked)
        {
            cleanedCode = CleanSVGs(cleanedCode);
        }
        if (cleanCommentsToggle.IsChecked)
        {
            cleanedCode = CleanComments(cleanedCode);
        }
        if (cleanImportsToggle.IsChecked)
        {
            cleanedCode = CleanImports(cleanedCode);
        }
        if (cleanBlankLinesToggle.IsChecked)
        {
            cleanedCode = CleanBlankLines(cleanedCode);
        }
        if (cleanWrapToggle.IsChecked)
        {
            cleanedCode = CleanWrapToggle(cleanedCode);
        }
        if (cleanWhitespaceToggle.IsChecked)
        {
            cleanedCode = CleanWhitespace(cleanedCode);
        }

        outputArea.Text = cleanedCode;
        UpdateCharacterCount();
        clearButton.IsVisible = !string.IsNullOrWhiteSpace(outputArea.Text);
    }

    private async void OnCopyButtonClicked(object sender, EventArgs e)
    {
        // Assuming `outputArea` is an Entry or Editor from which you're copying text
        var textToCopy = outputArea.Text;
        if (string.IsNullOrWhiteSpace(textToCopy))
        {
            return;
        }

        // Copy to clipboard
        await Clipboard.SetTextAsync(textToCopy);

        // Change button text to indicate copied
        var button = (Button)sender;
        button.Text = "Copied"; // You might use SVGs as images on the button instead of text

        // Wait 2 seconds, then change back
        await Task.Delay(2000);
        button.Text = "Copy"; // Reset to original text or image
    }

    private void OnClearButtonClicked(object sender, EventArgs e)
    {
        outputArea.Text = string.Empty;
        clearButton.IsVisible = false;
        UpdateCharacterCount();

    }
    private void OutputArea_TextChanged(object sender, TextChangedEventArgs e)
    {
        // Show clearButton only if outputArea has text
        clearButton.IsVisible = !string.IsNullOrWhiteSpace(outputArea.Text);
    }

    private void AllToggleChecked(object sender, CheckedChangedEventArgs e)
    {
        // Assuming `allToggle` is the CheckBox for "all" and it's already defined in your class
        bool isChecked = e.Value; // This gets the current checked state of the "all" toggle

        SetAllTogglesState(isChecked);
    }

    private void SetAllTogglesState(bool isChecked)
    {
        // Set the check state of all other toggles to match the "all" toggle
        cleanSvgToggle.IsChecked = isChecked;
        cleanCommentsToggle.IsChecked = isChecked;
        cleanImportsToggle.IsChecked = isChecked;
        cleanBlankLinesToggle.IsChecked = isChecked;
        cleanWrapToggle.IsChecked = isChecked;
        cleanWhitespaceToggle.IsChecked = isChecked;
    }

    private string CleanSVGs(string code)
    {
        // Replace all SVG content with empty SVG tags
        code = Regex.Replace(code, @"<svg[\s\S]*?<\/svg>", "<svg></svg>");
        return code;
    }

    private string CleanComments(string code)
    {
        // Remove single-line comments for languages like C++, Java, C#, JavaScript, etc.
        code = Regex.Replace(code, @"^\s*//.*\n?", "", RegexOptions.Multiline);

        // Remove multi-line comments for languages like C++, Java, C#, etc.
        code = Regex.Replace(code, @"/\*[\s\S]*?\*/\s*\n?", "");

        // Remove single-line comments for languages like Python, Ruby, etc.
        code = Regex.Replace(code, @"^\s*#.*\n?", "", RegexOptions.Multiline);

        // Remove multi-line comments for Python (triple quotes)
        code = Regex.Replace(code, @"'''[\s\S]*?'''\s*\n?", "");
        code = Regex.Replace(code, @"""""[\s\S]*?""""\s*\n?", "");

        // Remove HTML comments
        code = Regex.Replace(code, @"<!--[\s\S]*?-->\s*\n?", "");

        // Extra removal for inline comments in languages like Python and Ruby (without removing the entire line)
        code = Regex.Replace(code, @"\s*#.*$", "", RegexOptions.Multiline);

        return code;
    }

    private string CleanImports(string code)
    {
        // For JavaScript imports
        code = Regex.Replace(code, @"^import .*;\s+", "", RegexOptions.Multiline);

        // For Python imports
        code = Regex.Replace(code, @"^import .*\s+", "", RegexOptions.Multiline);

        // For Python 'from' imports
        code = Regex.Replace(code, @"^from .* import .*\s+", "", RegexOptions.Multiline);

        return code;
    }

    private string CleanBlankLines(string code)
    {
        // Removes blank lines
        code = Regex.Replace(code, @"^\s*[\r\n]+", "", RegexOptions.Multiline);
        return code;
    }

    private string CleanWrapToggle(string code)
    {
        const int maxLineLength = 250;
        var lines = code.Split(new[] { "\n" }, StringSplitOptions.None);
        var reformattedCode = new StringBuilder();
        var currentLine = new StringBuilder();

        foreach (var originalLine in lines)
        {
            var line = originalLine.Trim(); // Remove spaces from the beginning and end

            if ((currentLine.Length + line.Length + 1) <= maxLineLength)
            {
                if (currentLine.Length > 0)
                {
                    currentLine.Append(" ");
                }
                currentLine.Append(line);
            }
            else
            {
                reformattedCode.AppendLine(currentLine.ToString());
                currentLine.Clear();
                currentLine.Append(line);
            }

            if (currentLine.ToString().Contains(";") || string.IsNullOrEmpty(line))
            {
                reformattedCode.AppendLine(currentLine.ToString());
                currentLine.Clear();
            }
        }

        // Add any remaining content
        if (currentLine.Length > 0)
        {
            reformattedCode.Append(currentLine.ToString());
        }

        return reformattedCode.ToString();
    }

    private string CleanWhitespace(string code)
    {
        // Remove spaces around semicolons and braces
        code = Regex.Replace(code, @"([;{}])\s+", "$1");
        code = Regex.Replace(code, @"\s+([;{}])", "$1");

        // Remove spaces around equal signs
        code = Regex.Replace(code, @"\s+=\s+", "=");

        // Remove spaces around commas
        code = Regex.Replace(code, @"\s+,\s+", ",");

        // Remove spaces inside parentheses
        code = Regex.Replace(code, @"\s+\(\s+", "(");
        code = Regex.Replace(code, @"\s+\)\s+", ")");

        // Replace multiple spaces with a single space
        code = Regex.Replace(code, @"\s+", " ");

        // Remove leading and trailing spaces from each line
        code = Regex.Replace(code, @"^ +| +$", "", RegexOptions.Multiline);

        return code;
    }

}