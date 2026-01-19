using Microsoft.UI.Xaml.Controls;

using RavenFLow.ViewModels;

namespace RavenFLow.Views;

public sealed partial class MainPage : Page
{
    public MainViewModel ViewModel
    {
        get;
    }

    public MainPage()
    {
        ViewModel = App.GetService<MainViewModel>();
        InitializeComponent();
    }
}
